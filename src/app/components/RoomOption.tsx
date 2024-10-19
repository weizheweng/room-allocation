import { VStack, Text, HStack, Divider,  } from "../shared-components";
import { Guest, Room } from "../types/Rooms";
import { PeopleQty } from "./PeopleQty";

interface RoomOptionProps {
  room: Room,
  allocatedRoomQty: number,
  adultMaxQty: number,
  childMaxQty: number
  handleUpdateRoomQty: (room: Room, type: keyof Guest, qty: number) => void
}

export function RoomOption({ room, allocatedRoomQty,adultMaxQty, childMaxQty, handleUpdateRoomQty }: RoomOptionProps) {
  const handleAdultQtyChange = (qty?: number) => {
    if (qty === undefined) return
    handleUpdateRoomQty(room, 'adult', qty)
  }

  const handleChildQtyChange = (qty?: number) => {
    if (qty === undefined) return
    handleUpdateRoomQty(room, 'child', qty)
  }

  return (
    <VStack className="gap-4">
      <Text className="text-sm">
        {`房間(${room.name})：${allocatedRoomQty} 人`} {"("}
        {`房價：${room.roomPrice} 元`} {"，"}
        {`大人：${room.adultPrice} 元/人`} {"，"}
        {`小孩：${room.childPrice} 元/人`} {")"}
      </Text>
      <VStack className="gap-3">
        <HStack className="justify-between">
          <VStack>
            <Text className="text-xs">大人</Text>
            <Text className="text-xs text-gray-400">年齡 20+</Text>
          </VStack>
          <PeopleQty max={adultMaxQty} onChange={handleAdultQtyChange} />
        </HStack>
        <HStack className="justify-between">
          <Text className="text-xs">小孩</Text>
          <PeopleQty max={childMaxQty} onChange={handleChildQtyChange} />
        </HStack>
      </VStack>
      <Divider />
    </VStack>
  )
}