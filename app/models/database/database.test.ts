import { DatabaseModel, Database } from "./database"

test("can be created", () => {
  const instance: Database = DatabaseModel.create({})

  expect(instance).toBeTruthy()
})