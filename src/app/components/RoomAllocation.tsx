'use client'
import { Guest, Room } from "../types/Rooms"
import { VStack, Text, Box, HStack } from "../shared-components"
import { RoomOption } from "./RoomOption"
import { useState } from "react"
import { AllocatedData, calculateCapacity, calculateMaxQty, calculatePrice } from "../utils/calculate"
import { RoomNotice } from "./RoomNotice"

interface RoomAllocationProps {
  guest: Guest,
  rooms: Room[],
  allocatedData: AllocatedData
}

export function RoomAllocation({ guest, rooms, allocatedData: allocatedDataProps }: RoomAllocationProps) {
  const { adult, child } = guest
  const [allocatedData, setAllocatedData] = useState<AllocatedData>(allocatedDataProps)

  const handleUpdateRoomQty = (room: Room, type: keyof Guest, qty: number) => {
    setAllocatedData((prevQty) => ({ ...prevQty,  [room.name]: { ...prevQty[room.name], [type]: qty } }))
  }

  const allocatedAdult = Object.values(allocatedData).reduce((acc, curr) => acc + (curr.adult ?? 0), 0)
  const allocatedChild = Object.values(allocatedData).reduce((acc, curr) => acc + (curr.child ?? 0), 0)

  const isAllRoomsAllocated = allocatedAdult + allocatedChild === adult + child
  const canAllocate = Object.values(allocatedDataProps).every(room => !room.hasError)

  return (
    <VStack className='p-3 gap-2 border-dotted border-2 border-gray-500 rounded-lg min-w-[512px] bg-white'>
      <Text className='text-lg font-bold'>
        {`住客人數：${guest.adult} 位大人，${guest.child} 位小孩 / ${rooms.length} 房`}
      </Text>
      <RoomNotice canAllocate={canAllocate} isAllRoomsAllocated={isAllRoomsAllocated} adult={adult} child={child} allocatedAdult={allocatedAdult} allocatedChild={allocatedChild} />
      {
        Object.values(allocatedData)?.map((room) => {
          const adultMaxQty = calculateMaxQty(room.name, allocatedData, adult, 'adult')
          const childMaxQty = calculateMaxQty(room.name, allocatedData, child, 'child')

          const roomAdultCapacity = calculateCapacity(room.name, allocatedData, 'child', room.capacity)
          const roomChildCapacity = calculateCapacity(room.name, allocatedData, 'adult', room.capacity)

          const allocatedRoomQty = (allocatedData?.[room.name]?.adult ?? 0) + (allocatedData?.[room.name]?.child ?? 0)

          const hasAdult = allocatedData?.[room.name]?.adult
          const isDecrementDisabled = !!(allocatedData?.[room.name]?.child && allocatedData?.[room.name]?.adult === 1)

          const minAdultMaxQty = Math.min(adultMaxQty, roomAdultCapacity)
          const minChildMaxQty = hasAdult ? Math.min(childMaxQty, roomChildCapacity) : Math.min(childMaxQty, roomChildCapacity, 0)

          return (
            <RoomOption 
              key={room.name}
              room={room} 
              allocatedRoomQty={allocatedRoomQty}
              adultQty={room.adult ?? 0}
              childQty={room.child ?? 0}
              adultMaxQty={minAdultMaxQty} 
              childMaxQty={minChildMaxQty} 
              handleUpdateRoomQty={handleUpdateRoomQty}
              decrementDisabled={isDecrementDisabled}
              disabled={!canAllocate}
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