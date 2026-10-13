// Single source of truth for business details.
// Change a value here and it updates everywhere on the site.

export const business = {
  name: "NIM'S KITCHEN",
  phoneDisplay: '07062435315',
  phoneTel: 'tel:+2347062435315',
  /** WhatsApp number in international format, digits only (no +, no leading 0). */
  whatsappNumber: '2347062435315',
  email: 'nifemipeace1@gmail.com',
  addressShort: 'Bouesti, Ikere Ekiti',
  addressFull: 'Bouesti, Ikere Ekiti, Ekiti State, Nigeria',
  pickupLocation: 'Bouesti, Ikere Ekiti',
  timeZone: 'Africa/Lagos',

  deliveryFee: 500,
  minimumOrderAmount: 2000,
  /** Minutes. Shown as "X–(X+15) mins". */
  preparationTime: 30,
  deliveryAreas: ['Ikere Ekiti', 'Bouesti', 'Afao Road', 'Igbemo'],

  /**
   * Opening hours per weekday (0 = Sunday … 6 = Saturday), 24h "HH:MM".
   * Set a day to null to mark it closed.
   */
  hours: {
    0: { open: '12:00', close: '20:00' },
    1: { open: '08:00', close: '21:00' },
    2: { open: '08:00', close: '21:00' },
    3: { open: '08:00', close: '21:00' },
    4: { open: '08:00', close: '21:00' },
    5: { open: '08:00', close: '21:00' },
    6: { open: '08:00', close: '21:00' },
  } as Record<number, { open: string; close: string } | null>,
  hoursText: ['Mon – Sat: 8:00 AM – 9:00 PM', 'Sunday: 12:00 PM – 8:00 PM'],

  /** Add real profile URLs to show the icons; empty strings are hidden. */
  social: {
    facebook: '',
    instagram: '',
    twitter: '',
  },
} as const;
