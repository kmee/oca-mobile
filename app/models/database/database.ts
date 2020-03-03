import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const DatabaseModel = types
  .model("Database")
  .props({
    id: types.identifier,
    host: types.maybe(types.string),
    database: types.maybe(types.string),
    username: types.maybe(types.string),
    token: types.maybe(types.string),
    protocol: types.maybe(types.string),
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

  /**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type DatabaseType = Instance<typeof DatabaseModel>
export interface Database extends DatabaseType {}
type DatabaseSnapshotType = SnapshotOut<typeof DatabaseModel>
export interface DatabaseSnapshot extends DatabaseSnapshotType {}
