// We import and export out all the handlers here. This was done to seperate the handlers into files for readability.

// imports
import {
  handleMarketCreated,
  handleMarketFinalized
} from "./market";

import { 
  handleFeeWindowCreated, 
  handleFeeWindowRedeemed 
} from "./feeWindow";

import {
  handleInitialReportSubmitted,
  handleInitialReporterRedeemed,
  handleInitialReporterTransferred
} from "./initialReport";

import {
  handleDisputeCrowdsourcerCompleted,
  handleDisputeCrowdsourcerContribution,
  handleDisputeCrowdsourcerCreated,
  handleDisputeCrowdsourcerRedeemed
} from "./disputeCrowdsourcer";

import {
  handleTokensTransferred,
  handleTokensMinted,
  handleTokensBurned
} from "./token";

// exports
export {
  handleMarketCreated,
  handleMarketFinalized,
  handleFeeWindowCreated,
  handleFeeWindowRedeemed,
  handleInitialReportSubmitted,
  handleInitialReporterRedeemed,
  handleInitialReporterTransferred,
  handleDisputeCrowdsourcerCompleted,
  handleDisputeCrowdsourcerContribution,
  handleDisputeCrowdsourcerCreated,
  handleDisputeCrowdsourcerRedeemed,
  handleTokensTransferred,
  handleTokensMinted,
  handleTokensBurned
}
