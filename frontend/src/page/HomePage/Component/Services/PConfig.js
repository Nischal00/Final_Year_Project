export const pcConfig = {
  iceServers: [
    {
      urls: "stun:stun.l.google.com:19302",
    },
    {
      url: "stun:global.stun.twilio.com:3478?transport=udp",
      urls: "stun:global.stun.twilio.com:3478?transport=udp",
    },
    {
      url: "turn:global.turn.twilio.com:3478?transport=udp",
      username:
        "6b598fa99631116756a8115b12f9180a2d62c1f6f3d9231482676022bcb1f982",
      urls: "turn:global.turn.twilio.com:3478?transport=udp",
      credential: "wxUIFI1isoAsanj9tQi4RgNEjr0kmMtAKeRJKtZfe5U=",
    },
    {
      url: "turn:global.turn.twilio.com:3478?transport=tcp",
      username:
        "6b598fa99631116756a8115b12f9180a2d62c1f6f3d9231482676022bcb1f982",
      urls: "turn:global.turn.twilio.com:3478?transport=tcp",
      credential: "wxUIFI1isoAsanj9tQi4RgNEjr0kmMtAKeRJKtZfe5U=",
    },
    {
      url: "turn:global.turn.twilio.com:443?transport=tcp",
      username:
        "6b598fa99631116756a8115b12f9180a2d62c1f6f3d9231482676022bcb1f982",
      urls: "turn:global.turn.twilio.com:443?transport=tcp",
      credential: "wxUIFI1isoAsanj9tQi4RgNEjr0kmMtAKeRJKtZfe5U=",
    },
  ],
};
