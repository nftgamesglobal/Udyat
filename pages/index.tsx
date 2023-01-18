import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { useProgram, useClaimNFT, useProgramMetadata, useClaimConditions, claimConditionsQuery, 
} from "@thirdweb-dev/react/solana";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { write } from "fs";

// Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css");

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

const Home: NextPage = () => {
  const { program } = useProgram(
    "91DeK1fmcXHtbHHjK4dSz1aLwMVVtZ3yEan4QbmFVank", 
    "nft-drop"
    );
  
 
  //Read Hooks 
const { data: metadata, isLoading: loadingMetadata } = 
useProgramMetadata (program);

const {data: claimConditions, isLoading: loadingClaimCondition} =
useClaimConditions (program);

console.log("metadata", metadata);
console.log("claimConditions", claimConditions);

  //Write Hook
  const { mutateAsync: claim, isLoading, error } = useClaimNFT(program);

  return (
    <>
      <div className={styles.container}>
      <WalletMultiButtonDynamic />
        {
          //IF the metadata is loading, show a loading state
          loadingMetadata ? <h1>Loading...</h1> : <h1> {metadata?.name}</h1>
        }
        <h2 className={styles.h2}>Welcome to the UDYAT collection for founders</h2>
<div className={styles.iconContainer}>
          
          <Image
            width={75}
            height={75}
            src="/sol.png"
            className={styles.icon}
            alt="sol"
          />
          <Image
            width={150}
            height={150}
            src="/NFT Games logo.png"
            className={styles.icon}
            alt="NFT Games"
          />
          <Image
            width={100}
            height={100}
            src="/Arweave logo.png"
            className={styles.icon}
            alt="rweave"
          />
          <Image
            src="/thirdweb.svg"
            height={75}
            width={115}
            style={{
              objectFit: "contain",
            }}
            alt="thirdweb"
          />
        </div>
          
 {   
         // Claim Conditions
         loadingClaimCondition ? (
         <p> Loading...</p>
         ) : (
        <div>
           <h3> Claimed NFTs so far:</h3>
          <p>
            {claimConditions?.claimedSupply} / {claimConditions?.maxClaimable}
          </p>  
         </div>
             )
  }

  <button 
  onClick={() => claim ({
    amount: 1,})}
    className={styles.lightPurple}
    >
      {
      isLoading? (
        "Claiming..."
        ) : (
          "Claim One NFT"
          )
          }
          
  </button>
  <div 
  className={styles.iconContainer}>
  </div>
        
      </div>
    </>
  );
};

export default Home;
