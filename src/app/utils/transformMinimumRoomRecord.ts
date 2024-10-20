import { RoomRecord } from "../types/Rooms";
import { AllocatedData } from "./calculate";

export function transformMinimumRoomRecord(minimumAllocatedRooms: RoomRecord[] | null) {
  if (!minimumAllocatedRooms) return {};
  return minimumAllocatedRooms.reduce((acc: AllocatedData, curr) => {
    acc[curr.name] = curr;
    return acc;
  }, {});
}