import Head from 'next/head';
import { GetServerSideProps } from 'next';

import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdow } from "../components/Countdow";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from '../components/Profile';
import { ChallengeBox } from "../components/ChallengeBox";

import styles from '../styles/pages/Home.module.css';
import { CountdowProvider } from '../contexts/CountdowContext';
import { ChallengesProvider } from '../contexts/ChallengesContext';

interface HomeProps {
  level:number;
  currentExperience:number;
  challengesCompleted:number;
}

export default function Home(props: HomeProps) {
  return (
    <ChallengesProvider 
      level={props.level} 
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
    >
      <div className={styles.container}>
        <Head>
          <title>Início | move.it</title>
        </Head>

      <ExperienceBar />

      <CountdowProvider> 
      <section>
        <div>
          <Profile />
          <CompletedChallenges />
          <Countdow />
        </div>
        <div>
          <ChallengeBox></ChallengeBox>
        </div>
      </section>
      </CountdowProvider>
      </div>
    </ChallengesProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currentExperience, challengesCompleted } = ctx.req.cookies;

  return{
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted)
    }
  }
}

