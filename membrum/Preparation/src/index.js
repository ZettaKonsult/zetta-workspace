import ladokParser from 'ladokParser'
import unionAssigner from 'unionAssigner'

module.exports = {
  getAssignments: unionAssigner.getAssignments,
  parseLadokFile: ladokParser.parse,
  parseLadokDirectory: ladokParser.parseDirectory
}
