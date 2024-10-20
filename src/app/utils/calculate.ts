import { Guest, RoomRecord } from "../types/Rooms"

export type AllocatedData = Record<string, RoomRecord>

export function calculateMaxQty(roomName: string, data: AllocatedData, maxQty: number, type: keyof Guest) {
  const remainingAllocatedQty = Object.keys(data).reduce((acc, _roomName) => {
    if (!data?.[_roomName]?.[type] || roomName === _roomName) return acc
    return acc + data[_roomName][type]
  }, 0)

  return maxQty - (remainingAllocatedQty)
}

export function calculateCapacity(roomName: string, data: AllocatedData, type: keyof Guest, roomCapacity: number) {
  return roomCapacity - (data?.[roomName]?.[type] ?? 0)
}

export function calculatePrice(data: AllocatedData) {
  return Object.values(data).reduce((acc, curr) => {
    const adultTotalPrice = (curr.adult ?? 0) * curr.adultPrice
    const childTotalPrice = (curr.child ?? 0) * curr.childPrice
    const isEmpty = adultTotalPrice === 0 && childTotalPrice === 0

    const roomPrice = isEmpty ? 0 : curr.roomPrice
    return acc + roomPrice + adultTotalPrice + childTotalPrice
  }, 0)
}