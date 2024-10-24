import Validation from '@src/utils/Validation'

export const StormDetailRequestSchema = Validation.shape({
  longitude: Validation.number()
    .notRequired()
    .nullable()
    .optional()
    .default(undefined),
  latitude: Validation.number()
    .notRequired()
    .nullable()
    .optional()
    .default(undefined),
  windStrength: Validation.number()
    .notRequired()
    .nullable()
    .optional()
    .default(undefined),
  velocity: Validation.number()
    .notRequired()
    .nullable()
    .optional()
    .default(undefined),
  direction: Validation.number()
    .notRequired()
    .nullable()
    .optional()
    .default(undefined),
  gusts: Validation.number()
    .notRequired()
    .nullable()
    .optional()
    .default(undefined),
  temperature: Validation.number()
    .notRequired()
    .nullable()
    .optional()
    .default(undefined),
  movingDate: Validation.date()
    .notRequired()
    .nullable()
    .optional()
    .default(undefined),
  level: Validation.number()
    .notRequired()
    .nullable()
    .optional()
    .default(undefined),
})

export const StormSchema = Validation.shape({
  id: Validation.number()
    .notRequired()
    .default(undefined),
  code: Validation.string()
    .notRequired()
    .default(''),
  name: Validation.string()
    .max(200)
    .default(''),
  level: Validation.number()
    .notRequired()
    .nullable()
    .optional()
    .default(undefined),
  startImpactTime: Validation.date()
    .required('Bắt buộc')
    .default(undefined),
  endImpactTime: Validation.date()
    .required('Bắt buộc')
    .test('is-after-start', 'Ngày kết thúc phải lớn hơn ngày bắt đầu', (value, context) => {
      const {startImpactTime} = context.parent
      return value >= startImpactTime
    })
    .default(undefined),
  provinceIds: Validation.array()
    .min(1, 'Bắt buộc')
    .default([]),
  notificationMethods: Validation.array()
    .default([]),
  receivedNotificationGroups: Validation.array()
    .default([]),
  assignedTaskGroups: Validation.array()
    .default([]),
  preparationCompletionTimeBeforeStorm: Validation.date()
    .notRequired()
    .default(undefined),
  reportingTime: Validation.date()
    .notRequired()
    .default(new Date()),
  status: Validation.boolean()
    .default(true),
  stormDetailsRequests: Validation.array()
    .of(StormDetailRequestSchema)
    .default([StormDetailRequestSchema.getDefault()]),
  regions: Validation.array()
    .min(1, 'Bắt buộc')
    .default([]),
})

export const PrepareStormSchema = StormSchema.concat(
  Validation.shape({
    notificationMethods: Validation.array()
      .min(1, 'Bắt buộc')
      .default([]),
    receivedNotificationGroups: Validation.array()
      .min(1, 'Bắt buộc')
      .default([]),
    assignedTaskGroups: Validation.array()
      .min(1, 'Bắt buộc')
      .default([]),
    reportingTime: Validation.date()
      .required('Bắt buộc')
      .default(undefined),
    preparationCompletionTimeBeforeStorm: Validation.date()
      .required('Bắt buộc')
      .default(undefined)
  })
)