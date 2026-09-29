import { CommonModule } from '@angular/common';
import { Component, computed, input, resource } from '@angular/core';
import { MinuteToHoursPipe } from '@app/pipes';
import { ButtonModule } from '@openng/optimus-ui/button';
import QRCode from 'qrcode';

@Component({
  imports: [CommonModule, MinuteToHoursPipe, ButtonModule],
  selector: 'app-ticket-card',
  styleUrl: './ticket-card.scss',
  templateUrl: './ticket-card.html',
})
export class TicketCard {
  readonly order = input.required<any>();

  readonly qr = resource({
    params: () => this.order().code,
    loader: ({ params: code }) =>
      QRCode.toDataURL(code, {
        width: 512,
        margin: 1,
        errorCorrectionLevel: 'M',
      }),
  });

  readonly seatCodes = computed(() =>
    this.order()
      .tickets.map((s: any) => s.seat_code)
      .join(', '),
  );

  download(): void {
    const dataUrl = this.qr.value();
    if (!dataUrl) return;

    const link = document.createElement('a');

    link.href = dataUrl;
    link.download = `ticket-${this.order().code}.png`;

    link.click();
  }
}
