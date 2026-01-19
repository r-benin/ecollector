import RewardsCredits from "@/components/RewardsCredits";
import RewardsList, { reward } from "@/components/RewardsList";
import { useContext, useEffect, useState } from "react";


import RewardsClaimModal from "@/components/RewardsClaimModal";
import { View } from "react-native";
import { TransactionsContext } from "../_layout";

export default function RewardsScreen() {
  const { userData } = useContext(TransactionsContext)
  const [claimModalVisible, setClaimModalVisible] = useState<boolean>(false)
  const [rewardSelected, setRewardSelected] = useState<reward | null>(null)

  const { rewards } = useContext(TransactionsContext)

  function handleRewardPress(rewardName: string) {
    let rewardDetails = rewards.find((reward: any) => reward.name === rewardName)
    setRewardSelected(rewardDetails ? rewardDetails : null)
    setClaimModalVisible(true)
  }

  // useEffect to close modal when rewards data changes
  useEffect(() => {
    if (rewardSelected) {
      setClaimModalVisible(false)
      setRewardSelected(null)
    }
  }, [rewards])

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
      }}
    >
      <RewardsClaimModal visible={claimModalVisible && rewardSelected?.status === 'Active'} reward={rewardSelected} onRequestClose={() => setClaimModalVisible(false)} setRewardSelected={setRewardSelected} />
      <RewardsCredits credits={userData.credits}/>
      <RewardsList refData={rewards} handleRewardPress={handleRewardPress}/>
    </View>
  );
}
