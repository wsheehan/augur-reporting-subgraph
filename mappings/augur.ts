// Required for dynamic memory allocation in WASM / AssemblyScript
import 'allocator/arena'
export { allocate_memory }

// imports
import {
  handleMarketCreated,
  handleMarketFinalized,
  handleReportingParticpiantDisavowed,
  handleMarketMigrated,
  handleMarketMailboxTransferred,
  handleMarketParticipantsDisavowed,
  handleMarketTransferred,
  handleCompleteSetPurchased,
  handleCompleteSetSold,
  handleTradingProceedsClaimed
} from "./market";

import {
  handleInitialReportSubmitted,
  handleInitialReporterRedeemed,
  handleInitialReporterTransferred
} from "./initialReport";




// exports
export {
  handleMarketCreated,
  handleMarketFinalized,
  handleReportingParticpiantDisavowed,
  handleMarketMigrated,
  handleMarketMailboxTransferred,
  handleMarketParticipantsDisavowed,
  handleMarketTransferred,
  handleCompleteSetPurchased,
  handleCompleteSetSold,
  handleTradingProceedsClaimed,
  handleInitialReportSubmitted,
  handleInitialReporterRedeemed,
  handleInitialReporterTransferred
}
