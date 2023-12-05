import { useState } from 'react'
import { oplogTableCols } from '@/components/table/op-log/cols'
import OpLogTable from '@/components/table/op-log/table'
import { Input } from '@/components/ui/input'
import { ZOplog } from '@/utils/zod/oplog'

export default function Home() {
   const [oplogFile, setOplogFile] = useState<ZOplog[]>()
   return (
      <div className="flex flex-col gap-5 py-10">
         <div className="w-fit">
            <Input
               type="file"
               accept=".json"
               onChange={(event) => {
                  const fileInput = event.target
                  const file = fileInput?.files?.[0]

                  if (file) {
                     const reader = new FileReader()

                     reader.onload = function (e) {
                        try {
                           const jsonData = JSON.parse(e?.target?.result as string)
                           setOplogFile(jsonData)
                           // displayJsonData(jsonData);
                        } catch (error) {
                           console.error('Error parsing JSON file:', error)
                        }
                     }

                     reader.readAsText(file)
                  }
               }}
            />
         </div>
         <OpLogTable columns={oplogTableCols} data={oplogFile || []} />
      </div>
   )
}

// function displayJsonData(data) {
//   const outputElement = document.getElementById("output");
//   outputElement.textContent = JSON.stringify(data, null, 2);
// }
