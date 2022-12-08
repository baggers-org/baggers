import { Injectable } from '@nestjs/common';
import { env } from '~/env/env.schema';
import { WebSocket } from 'ws';
import { SocketMessage } from './socket-message';
import { Observable } from 'rxjs';
import { Aggregate } from '~/charts/entities/aggregate.entity';

@Injectable()
export class MarketDataSocketService {
  private socket: WebSocket;
  constructor() {
    this.socket = new WebSocket(env.WS_URL);

    this.socket.addEventListener('open', () => {
      console.log('Connected to market-data-ws at ', env.WS_URL);
    });
  }

  send(message: SocketMessage) {
    this.socket.send(JSON.stringify(message));
  }

  subscribeToAggregateData(
    stocks: string[]
  ): Observable<Aggregate[]> {
    this.send({
      action: 'subscribe',
      params: stocks.map((s) => `A.${s}`).join(','),
    });

    return new Observable((subscriber) => {
      this.socket.addEventListener('message', (event) => {
        const data = JSON.parse(event.data.toString());
        subscriber.next(data);
      });
    });
  }
}
