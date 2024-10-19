import mockRoomData from '../mock-data/mockRoomData.json'
import { Rooms } from '../types/Rooms'

export const getRoomData = () => {
  return mockRoomData as Rooms[]
};