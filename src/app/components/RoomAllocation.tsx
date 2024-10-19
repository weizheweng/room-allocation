'use client'
import { Guest, Room } from "../types/Rooms"
import { VStack, Text, Box, HStack } from "../shared-components"
import { RoomOption } from "./RoomOption"
import { useState } from "react"
import { AllocatedData, calculateCapacity, calculateMaxQty, calculatePrice } from "../utils/calculate"

interface RoomAllocationProps {
  guest: Guest,
  rooms: Room[]
}

export function RoomAllocation({ guest, rooms }: RoomAllocationProps) {
  const { adult, child } = guest
  const [allocatedData, setAllocatedData] = useState<AllocatedData>({})

  const handleUpdateRoomQty = (room: Room, type: keyof Guest, qty: number) => {
    setAllocatedData((prevQty) => ({ ...prevQty,  [room.name]: { ...prevQty[room.name], [type]: qty, ...room } }))
  }

  const allocatedAdult = Object.values(allocatedData).reduce((acc, curr) => acc + (curr.adult ?? 0), 0)
  const allocatedChild = Object.values(allocatedData).reduce((acc, curr) => acc + (curr.child ?? 0), 0)

  const isAllRoomsAllocated = allocatedAdult + allocatedChild === adult + child
  return (
    <VStack className='p-3 gap-2 border-dotted border-2 border-gray-500 rounded-lg min-w-[512px] bg-white'>
      <Text className='text-lg font-bold'>
        {`住客人數：${guest.adult} 位大人，${guest.child} 位小孩 / ${rooms.length} 房`}
      </Text>
      <Box className="p-2 border-blue-200 bg-blue-50 rounded">
        <Text className={`text-xs ${isAllRoomsAllocated ? 'text-green-500' : 'text-gray-500'}`}>
        {
          isAllRoomsAllocated 
            ? "已完成分配"
            : `尚未分配人數：${adult-allocatedAdult} 位大人，${child-allocatedChild} 位小孩`
        }
        </Text>
      </Box>
      {
        rooms?.map((room) => {
          const adultMaxQty = calculateMaxQty(room.name, allocatedData, adult, 'adult')
          const childMaxQty = calculateMaxQty(room.name, allocatedData, child, 'child')

          const roomAdultCapacity = calculateCapacity(room.name, allocatedData, 'child', room.capacity)
          const roomChildCapacity = calculateCapacity(room.name, allocatedData, 'adult', room.capacity)

          const allocatedRoomQty = (allocatedData?.[room.name]?.adult ?? 0) + (allocatedData?.[room.name]?.child ?? 0)
          const minChildMaxQty = allocatedData?.[room.name]?.adult ? Math.min(childMaxQty, roomChildCapacity) : Math.min(childMaxQty, roomChildCapacity, 0)
          return (
            <RoomOption 
              key={room.name}
              room={room} 
              allocatedRoomQty={allocatedRoomQty}
              adultMaxQty={Math.min(adultMaxQty, roomAdultCapacity)} 
              childMaxQty={minChildMaxQty} 
              handleUpdateRoomQty={handleUpdateRoomQty}
            />
          )
        })
      }
      <HStack className="justify-end">
        <Text>{`總價：${calculatePrice(allocatedData)} 元`}</Text>
      </HStack>
    </VStack>
  )
}