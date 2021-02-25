import styles from '../styles/components/Profile.module.css';


export function Profile(){
    return(
        <div className={styles.profileContainer}>
            <img src="https://github.com/yasmin-carvalho.png" alt="YasminKarolyne" />
            <div>
                <strong>Yasmin Karolyne</strong>
                <p>Level 1</p>
            </div>
        </div>
    );
}