import { InMemoryPatientRepository } from '../../../../../test/repositories/in-memory-patient-repository'
import { makePatient } from '../../../../../test/factories/make-patient'
import { InMemoryPatientAttachmentsRepository } from 'test/repositories/in-memory-patient-attachments-repository'
import { FetchPatientsUseCase } from './fetch-patients'

let inMemoryPatientAttachmentsRepository: InMemoryPatientAttachmentsRepository
let inMemoryPatientRepository: InMemoryPatientRepository
let sut: FetchPatientsUseCase

describe('Fetch Patients', () => {
  beforeEach(() => {
    inMemoryPatientAttachmentsRepository =
      new InMemoryPatientAttachmentsRepository()
    inMemoryPatientRepository = new InMemoryPatientRepository(
      inMemoryPatientAttachmentsRepository,
    )
    sut = new FetchPatientsUseCase(inMemoryPatientRepository) // system under test
  })

  it('should be able to fetch patients', async () => {
    await inMemoryPatientRepository.create(makePatient({ name: 'fernando' }))
    await inMemoryPatientRepository.create(makePatient({ name: 'lipe' }))

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
      await inMemoryPatientRepository.create(makePatient())
    }

    const result = await sut.execute({
      page: 2,
    })

    expect(result.value?.patients).toHaveLength(2)
  })
})
