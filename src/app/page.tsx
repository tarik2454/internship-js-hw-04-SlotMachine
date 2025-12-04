import Image from "next/image";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.logoIcon}>
          <Image
            src="/logo.svg"
            width={340}
            height={69}
            alt="Tokyo Slot Logo"
          />
        </div>

        <div className={styles.slotMachine}>
          <Image
            src={"/machine.svg"}
            width={500}
            height={296}
            alt="Slot Machine"
          />
        </div>

        <p className={styles.betText}>Place a bid</p>

        <div className={styles.betBtn}>
          <button>
            <span>
              <Image
                src="/plus-btn.svg"
                width={63}
                height={66}
                alt="Plus Button"
              />
            </span>
          </button>
          <Image
            src="/scoreboard.svg"
            width={189}
            height={62}
            alt="Scoreboard"
          />
          <button>
            <span>
              <Image
                src="/minus-btn.svg"
                width={63}
                height={66}
                alt="Minus Button"
              />
            </span>
          </button>
        </div>

        <div className={styles.spinWrapper}>
          <button className={styles.spinBtn}>
            <Image
              src="/spin-btn.svg"
              width={194}
              height={118}
              alt="Spin Button"
            />
          </button>
          <div className={styles.spinBase}>
            <Image
              src="/spin-button-base.svg"
              width={251}
              height={162}
              alt="Spin Button"
            />
          </div>
        </div>

        <div className={styles.union}>
          <Image src="/union.svg" width={410} height={123} alt="Spin Button" />
        </div>
      </div>
    </div>
  );
}
