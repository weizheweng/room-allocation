import { RoomAllocation } from "./RoomAllocation"
import { getRoomData } from "../utils/getRoomData"
import { Box, VStack } from "../shared-components";
import { getMinimumRoomAllocation } from "../utils/getMinimumRoomAllocation"
import { transformMinimumRoomRecord } from "../utils/transformMinimumRoomRecord";


export function Room() {
  const roomData = getRoomData()

  return (
    <VStack className='p-4 gap-4 bg-gray-100 min-h-[100vh] overflow-x-auto'>
      {roomData?.map((room) => {
        const minimumRoomAllocation = getMinimumRoomAllocation(room.guest, room.rooms)
        const allocatedData = transformMinimumRoomRecord(minimumRoomAllocation)
        return (
          <RoomAllocation key={room.id} guest={room.guest} rooms={room.rooms} allocatedData={allocatedData} />
        )
      })}
    </VStack>
  );
}
