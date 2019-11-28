import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { DatabaseModel } from "../database/database"

/**
 * Model description here for TypeScript hints.
 */
export const DatabaseStoreModel = types
  .model("DatabaseStore")
  .props({
    databases: types.optional(types.array(DatabaseModel), []),
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

  /**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type DatabaseStoreType = Instance<typeof DatabaseStoreModel>
export interface DatabaseStore extends DatabaseStoreType {}
type DatabaseStoreSnapshotType = SnapshotOut<typeof DatabaseStoreModel>
export interface DatabaseStoreSnapshot extends DatabaseStoreSnapshotType {}
