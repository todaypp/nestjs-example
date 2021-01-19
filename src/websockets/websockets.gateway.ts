import { Server, Socket } from 'socket.io';
import { UseFilters, Logger } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
  WsResponse,
} from '@nestjs/websockets';

import { AllExceptionsFilter } from './all-exception.filter';
import { IO_EVENTS } from '../common/types/constants';

const CUSTOM_IO_EVENTS = {
  ECHO: 'echo',
  IDENTITY: 'identity',
  PIPE: 'pipe',
};

@UseFilters(new AllExceptionsFilter())
@WebSocketGateway()
export class WebsocketsGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('WebSockets');

  afterInit(server: any) {
    this.logger.log(`WebSocket Server init`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`${IO_EVENTS.CONNECTION} (${client.id}, ${JSON.stringify(args)})`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`${IO_EVENTS.DISCONNECT} (${client.id})`);
  }

  @SubscribeMessage(CUSTOM_IO_EVENTS.ECHO)
  handleEcho(@MessageBody() data: string): string {
    this.logger.log(`on ${CUSTOM_IO_EVENTS.ECHO}`);
    if (data === 'error') throw new WsException('ECHO ERROR');
    return data;
  }

  @SubscribeMessage(CUSTOM_IO_EVENTS.PIPE)
  handlePipe(@MessageBody() data: Array<number>): Observable<WsResponse<number>> {
    this.logger.log(`on ${CUSTOM_IO_EVENTS.PIPE}`);
    return from(data).pipe(map((item) => ({ event: 'pipe', data: item })));
  }

  @SubscribeMessage(CUSTOM_IO_EVENTS.IDENTITY)
  async handleIdentity(@MessageBody() data: number): Promise<number> {
    this.logger.log(`on ${CUSTOM_IO_EVENTS.IDENTITY}`);
    return data;
  }
}
