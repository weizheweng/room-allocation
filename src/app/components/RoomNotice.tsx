import { Box, Text } from "../shared-components";

interface RoomNoticeProps {
  canAllocate: boolean,
  isAllRoomsAllocated: boolean,
  adult: number,
  child: number,
  allocatedAdult: number,
  allocatedChild: number,
}

export function RoomNotice({ canAllocate, isAllRoomsAllocated, adult, child, allocatedAdult, allocatedChild }: RoomNoticeProps) {
  return (
    <>
      {
        canAllocate 
          ? <Box className={`p-2 ${isAllRoomsAllocated ? 'border-green-200 bg-green-50' : 'border-blue-200 bg-blue-50'} rounded`}>
              <Text className={`text-xs ${isAllRoomsAllocated ? 'text-green-500' : 'text-gray-500'}`}>
              {
                isAllRoomsAllocated 
                  ? "已完成分配"
                  : `尚未分配人數：${adult-allocatedAdult} 位大人，${child-allocatedChild} 位小孩`
              }
              </Text>
            </Box>
          : <Box className="p-2 border-red-200 bg-red-50 rounded">
              <Text className="text-xs text-red-500">
                無法完成分配
              </Text>
            </Box>
      }
    </>
  )
}