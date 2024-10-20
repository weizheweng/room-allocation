export interface Guest {
  adult: number,
  child: number,
}

export interface Room {
  id: number,
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

export interface RoomRecord extends Room {
  adult?: number,
  child?: number,
  hasError?: boolean,
}