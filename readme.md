# pnpm i
1. **.env:** 
  ```js
  DATABASE_URL="postgresql://<username>:<password>@<hostname>:<port>/<database>?schema=public"
  JWT_PRIVATE_KEY=""
  JWT_PUBLIC_KEY=""
  CLOUDFLARE_ACCOUNT_ID=""
  AWS_BUCKET_NAME=""
  AWS_ACCESS_KEY_ID=""
  AWS_SECRET_ACCESS_KEY=""
  ```
2. ***Criar o banco de dados com Docker*** 
  ```js
    docker-compose up -d
  ```
3. **Gerar tabelas no banco de dados de acordo com o schema do prisma**
  ```js
    pnpm prisma migrate dev
  ```
4. **Abrir a representação do banco de dados visualmente**
  ```js
    pnpm prisma studio
  ```
5. **Rodar testes unitários**
  ```js
    pnpm run test
  ```
6. **Rodar testes end-to-end**
  ```js
    pnpm run test:e2e
  ```
7. **Rodar aplicação**
  ```js
    pnpm run start:dev
  ```


---


# Sistema de Agendamento

Este sistema de agendamento permite aos usuários marcar consultas de três formas diferentes:

1. **Consulta Única:** Os usuários podem agendar uma única consulta em um horário específico.
2. **Contrato de Consultas Semanais:** Os usuários podem agendar um contrato de consultas por semana durante um período de tempo determinado.
3. **Agendamentos por Períodos de Horas:** Os usuários podem agendar agendamentos com intervalos de tempo e duração específicos.

## Implementação

Para implementar o sistema de agendamento e retornar um único array de agendamentos, siga estes passos:

### Consulta Única

1. Implemente uma função `scheduleSingleAppointment(startTime: Date, endTime: Date, userId: string): Appointment`, que recebe o horário de início, o horário de término e o ID do usuário e retorna um objeto de agendamento para uma consulta única.

2. Na função `scheduleSingleAppointment`, verifique se o horário solicitado está disponível.

3. Crie um novo registro na tabela `Appointment` com os detalhes do agendamento.

### Contrato de Consultas Semanais

1. Implemente uma função `scheduleWeeklyContractAppointments(startTime: Date, endTime: Date, userId: string, weeks: number): Appointment[]`, que recebe o horário de início, o horário de término, o ID do usuário e o número de semanas e retorna um array de objetos de agendamento para um contrato de consultas semanais.

2. Na função `scheduleWeeklyContractAppointments`, calcule os horários das consultas para todas as semanas no período especificado.

3. Verifique se os horários calculados estão disponíveis.

4. Crie um novo registro na tabela `Appointment` para cada consulta programada.

### Agendamentos por Períodos de Horas

1. Implemente uma função `scheduleHourlyAppointments(startTime: Date, endTime: Date, interval: number, userId: string): Appointment[]`, que recebe o horário de início, o horário de término, o intervalo de tempo desejado e o ID do usuário, e retorna um array de objetos de agendamento para agendamentos por períodos de horas.

2. Na função `scheduleHourlyAppointments`, divida o período especificado em intervalos de tempo desejados.

3. Verifique se os intervalos calculados estão disponíveis.

4. Crie um novo registro na tabela `Appointment` para cada intervalo agendado.

### Agregação dos Agendamentos

1. Implemente uma função `getAppointmentsByType(userId: string): Appointment[]`, que recebe o ID do usuário e retorna um array contendo todos os agendamentos associados a esse usuário, independentemente do tipo de agendamento.

2. Dentro da função `getAppointmentsByType`, chame as funções de agendamento correspondentes para cada tipo de agendamento.

3. Agregue todos os resultados em um único array e retorne-o.

## Próximos Passos

1. Implemente as funções de verificação de disponibilidade para cada tipo de agendamento.
2. Crie os endpoints da API para lidar com as solicitações de agendamento.
3. Implemente a lógica de criação de registros na tabela `Appointment`.
4. Adicione validações e tratamento de erros conforme necessário.
