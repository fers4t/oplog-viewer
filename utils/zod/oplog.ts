import { z } from 'zod'

const oplogSchema = z.object({
   lsid: z.object({
      id: z.object({
         $binary: z.object({
            base64: z.string(),
            subType: z.string(),
         }),
      }),
      uid: z.object({
         $binary: z.object({
            base64: z.string(),
            subType: z.string(),
         }),
      }),
   }),
   txnNumber: z.number(),
   op: z.enum(['i', 'u', 'd', 'c']),
   ns: z.string(),
   ui: z.object({
      $binary: z.object({
         base64: z.string(),
         subType: z.string(),
      }),
   }),
   o: z.object({
      $v: z.number(),
      diff: z.object({
         u: z.object({
            updatedAt: z.object({
               $date: z.string(),
            }),
         }),
         sactivity: z.object({
            u: z.object({
               courierArrivedToCompany: z.object({
                  $date: z.string(),
               }),
            }),
         }),
      }),
      abortIndexBuild: z.string().optional(),
      startIndexBuild: z.string().optional(),
      indexBuildUUID: z
         .object({
            $binary: z.object({
               base64: z.string(),
               subType: z.string(),
            }),
         })
         .optional(),
      indexes: z
         .array(
            z.object({
               v: z.number(),
               unique: z.boolean(),
               key: z.object({}).refine((data) => Object.keys(data).length > 0),
               name: z.string(),
               background: z.boolean(),
            }),
         )
         .optional(),
      cause: z
         .object({
            ok: z.boolean(),
            code: z.number(),
            codeName: z.string(),
            errmsg: z.string(),
            keyPattern: z.object({}).refine((data) => Object.keys(data).length > 0),
            keyValue: z.object({}).refine((data) => Object.keys(data).length > 0),
         })
         .optional(),
   }),
   o2: z.object({
      _id: z.object({
         $oid: z.string(),
      }),
   }),
   needsRetryImage: z.string(),
   stmtId: z.number(),
   ts: z.object({
      $timestamp: z.object({
         t: z.number(),
         i: z.number(),
      }),
   }),
   t: z.number(),
   v: z.number(),
   wall: z.object({
      $date: z.string(),
   }),
   prevOpTime: z.object({
      ts: z.object({
         $timestamp: z.object({
            t: z.number(),
            i: z.number(),
         }),
      }),
      t: z.number(),
   }),
})

export type ZOplog = z.infer<typeof oplogSchema>
