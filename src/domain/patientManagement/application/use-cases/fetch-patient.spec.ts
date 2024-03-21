import { InMemoryPatientsRepository } from '../../../../../test/repositories/in-memory-patient-repository'
import { makePatient } from '../../../../../test/factories/make-patient'
import { InMemoryPatientAttachmentsRepository } from 'test/repositories/in-memory-patient-attachments-repository'
import { FetchPatientsUseCase } from './fetch-patients'

let inMemoryPatientAttachmentsRepository: InMemoryPatientAttachmentsRepository
let inMemoryPatientsRepository: InMemoryPatientsRepository
let sut: FetchPatientsUseCase

describe('Fetch Patients', () => {
  beforeEach(() => {
    inMemoryPatientAttachmentsRepository =
      new InMemoryPatientAttachmentsRepository()
    inMemoryPatientsRepository = new InMemoryPatientsRepository(
      inMemoryPatientAttachmentsRepository,
    )
    sut = new FetchPatientsUseCase(inMemoryPatientsRepository) // system under test
  })

  it('should be able to fetch patients', async () => {
    await inMemoryPatientsRepository.create(makePatient({ name: 'fernando' }))
    await inMemoryPatientsRepository.create(makePatient({ name: 'lipe' }))

    const result = await sut.execute({ page: 1 })

    if (result.isRight()) {
      expect(result.value?.patients).toEqual([
        {
          _id: expect.anything(),
          props: expect.objectContaining({ name: 'fernando' }),
        },
        {
          _id: expect.anything(),
          props: expect.objectContaining({ name: 'lipe' }),
        },
      ])
    }
  })

  it('should be able to fetch paginated patients', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryPatientsRepository.create(makePatient())
    }

    const result = await sut.execute({
      page: 2,
    })

    expect(result.value?.patients).toHaveLength(2)
  })
})
