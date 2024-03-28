import { InMemoryAppointmentRepository } from 'test/repositories/in-memory-appointment-repository'
import { InMemoryEmployeeRepository } from 'test/repositories/in-memory-employee-repository'
import { SetCurrentServiceIdUseCase } from './set-current-service-id'
import { makeEmployee } from 'test/factories/make-employee'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeAppointment } from 'test/factories/make-appointment'

let inMemoryEmployeeRepository: InMemoryEmployeeRepository
let inMemoryAppointmentRepository: InMemoryAppointmentRepository
let sut: SetCurrentServiceIdUseCase

describe('Set Current Service', () => {
  beforeEach(() => {
    inMemoryEmployeeRepository = new InMemoryEmployeeRepository()
    inMemoryAppointmentRepository = new InMemoryAppointmentRepository()
    sut = new SetCurrentServiceIdUseCase(
      inMemoryEmployeeRepository,
      inMemoryAppointmentRepository,
    )
  })

  it('should be able set current service by id', async () => {
    const newEmployee = makeEmployee(
      { companyId: new UniqueEntityID('company-1') },
      new UniqueEntityID('employee-1'),
    )

    await inMemoryEmployeeRepository.create(newEmployee)

    const newAppointment = makeAppointment(
      { companyId: new UniqueEntityID('company-1') },
      new UniqueEntityID('appointment-1'),
    )

    await inMemoryAppointmentRepository.createOneAppointment(newAppointment)

    const result = await sut.execute({
      employeeId: newEmployee.id.toValue(),
      appointmentId: newAppointment.id.toValue(),
    })

    expect(result.isRight()).toBe(true)

    if (result.isRight()) {
      expect(result.value.employee.currentServiceId).toEqual(newAppointment.id)
      expect(inMemoryEmployeeRepository.items[0]).toEqual(result.value.employee)
    }
  })
})
