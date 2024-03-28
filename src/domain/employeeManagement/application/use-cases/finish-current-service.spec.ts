import { InMemoryAppointmentRepository } from 'test/repositories/in-memory-appointment-repository'
import { InMemoryEmployeeRepository } from 'test/repositories/in-memory-employee-repository'
import { makeEmployee } from 'test/factories/make-employee'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeAppointment } from 'test/factories/make-appointment'
import { FinishCurrentServiceUseCase } from './finish-current-service'

let inMemoryEmployeeRepository: InMemoryEmployeeRepository
let inMemoryAppointmentRepository: InMemoryAppointmentRepository
let sut: FinishCurrentServiceUseCase

describe('Set Current Service', () => {
  beforeEach(() => {
    inMemoryEmployeeRepository = new InMemoryEmployeeRepository()
    inMemoryAppointmentRepository = new InMemoryAppointmentRepository()
    sut = new FinishCurrentServiceUseCase(
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
      // console.log(newAppointment.id)
      // console.log(result.value.employee.currentServiceId)
      expect(result.value.employee.currentServiceId).toEqual(null)
      expect(inMemoryEmployeeRepository.items[0]).toEqual(result.value.employee)
    }
  })
})
