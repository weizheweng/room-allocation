import { RoomAllocation } from "./RoomAllocation"
import { getRoomData } from "../utils/getRoomData"
import { VStack } from "../shared-components";
import { getMinimumRoomAllocation } from "../utils/getMinimumRoomAllocation"
import { transformMinimumRoomRecord } from "../utils/transformMinimumRoomRecord";


export function Room() {
  const roomData = getRoomData()

  return (
    <VStack className='p-4 gap-4 items-center bg-gray-100 min-h-[100vh]'>
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
