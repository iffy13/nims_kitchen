import { business } from '@/config/business';
import { formatNaira } from '@/lib/business';
import { unitPrice, lineTotal } from '@/lib/cart';
import type { Order } from '@/types';

export const whatsappLink = (text?: string) =>
  `https://wa.me/${business.whatsappNumber}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

export function newOrderId(date = new Date()) {
  const ymd = new Intl.DateTimeFormat('en-CA', { timeZone: business.timeZone })
    .format(date)
    .replace(/-/g, '')
    .slice(2);
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `NK-${ymd}-${rand}`;
}

/** Plain-text order summary that gets pre-filled in the customer's WhatsApp chat with the kitchen. */
export function buildOrderMessage(order: Order) {
  const lines: string[] = [];
  lines.push(`*NEW ORDER — ${business.name}*`);
  lines.push(`Order ID: ${order.id}`);
  lines.push('');
  lines.push('*Items*');
  order.items.forEach((item, i) => {
    lines.push(`${i + 1}. ${item.product.name} × ${item.quantity} — ${formatNaira(lineTotal(item))}`);
    if (item.selectedAddOns.length > 0) {
      lines.push(`   + ${item.selectedAddOns.map((a) => a.name).join(', ')}`);
    }
    if (item.quantity > 1) {
      lines.push(`   (${formatNaira(unitPrice(item))} each)`);
    }
  });
  lines.push('');
  lines.push(`Subtotal: ${formatNaira(order.subtotal)}`);
  lines.push(`Delivery: ${order.deliveryType === 'delivery' ? formatNaira(order.deliveryFee) : 'Pickup (free)'}`);
  lines.push(`*Total: ${formatNaira(order.total)}*`);
  lines.push('');
  lines.push('*Customer*');
  lines.push(`Name: ${order.customerInfo.fullName}`);
  lines.push(`Phone: ${order.customerInfo.phone}`);
  if (order.deliveryType === 'delivery') {
    lines.push(`Area: ${order.customerInfo.area}`);
    lines.push(`Address: ${order.customerInfo.address}`);
  } else {
    lines.push(`Pickup at: ${business.pickupLocation}`);
  }
  lines.push(`Payment: ${order.paymentMethod === 'cod' ? 'Pay on delivery/pickup' : 'Bank transfer (please send account details)'}`);
  lines.push(`When: ${order.scheduledFor ?? 'As soon as possible'}`);
  if (order.notes) {
    lines.push('');
    lines.push(`Notes: ${order.notes}`);
  }
  return lines.join('\n');
}
