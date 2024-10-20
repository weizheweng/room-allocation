import { Guest, Room } from "../types/Rooms";

export function getMinimumRoomAllocation(guest: Guest, rooms: Room[]) {
  let remainingAdults = guest.adult;
  let remainingChildren = guest.child;

  // 根據房間的每人平均價格進行排序
  rooms.sort((a, b) => {
    const costA = a.roomPrice / a.capacity;
    const totalCostA = (a.adultPrice + costA) + (a.childPrice + costA);

    const costB = b.roomPrice / b.capacity;
    const totalCostB = (b.adultPrice + costB) + (b.childPrice + costB);

    return totalCostA - totalCostB;
  });

  const assignedRooms = rooms.map(room => ({ ...room, adult: 0, child: 0, hasError: false }));

  for (const room of assignedRooms) {
    if (remainingAdults === 0 && remainingChildren === 0) break;

    let adultsInRoom = 0;
    let childrenInRoom = 0;

    // 如果有小孩，先安排至少一個大人陪同
    if (remainingChildren > 0) {
      childrenInRoom = Math.min(room.capacity - 1, remainingChildren); // 至少留一個位子給大人
      adultsInRoom = 1; // 每個有小孩的房間必須至少有一個大人
      remainingChildren -= childrenInRoom;
      remainingAdults -= 1; // 減去陪同的小孩的那位大人
    }

    // 安排剩餘的成人
    const totalGuests = Math.min(room.capacity - adultsInRoom - childrenInRoom, remainingAdults);
    adultsInRoom += totalGuests;
    remainingAdults -= totalGuests;

    if (adultsInRoom === 0 && childrenInRoom > 0) {
      room.hasError = true;
      break;
    }
    room.adult = adultsInRoom;
    room.child = childrenInRoom;
  }

  assignedRooms.sort((a, b) => a.id - b.id)

  return assignedRooms;
}
