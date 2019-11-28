import { DatabaseStoreModel, DatabaseStore } from "./database-store"

test("can be created", () => {
  const instance: DatabaseStore = DatabaseStoreModel.create({})

  expect(instance).toBeTruthy()
})