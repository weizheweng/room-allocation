export interface Guest {
  adult: number,
  child: number,
}

export interface Room {
  name: string,
  roomPrice: number,
  adultPrice: number,
  childPrice: number,
  capacity: number,
}

export interface Rooms {
  id: number,
  guest: Guest,
  rooms: Room[],
}