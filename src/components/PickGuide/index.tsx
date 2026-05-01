/**
 * @file 挑瓜指南
 */

import { defineComponent, ref } from 'vue';
import cn from 'classnames';
import guideImg from '@/assets/guide.jpg';
import styles from './index.module.less';

export default defineComponent({
  name: 'PickGuide',
  setup() {
    const expanded = ref(false);
    const viewing = ref(false);

    return () => (
      <div class={styles.root}>
        <div
          class={styles.toggle}
          onClick={() => { expanded.value = !expanded.value; }}
        >
          {expanded.value ? '收起挑瓜指南 ▲' : '挑瓜指南 ▼'}
        </div>

        {expanded.value && (
          <div class={styles.content}>
            <div class={styles.summary}>
              <div class={styles.tip}>
                <span class={styles.icon}>👂</span>
                <span>133-160Hz = 好瓜</span>
              </div>
              <div class={styles.tip}>
                <span class={styles.icon}>🟢</span>
                <span>底部不发黄 = 好瓜</span>
              </div>
              <div class={styles.tip}>
                <span class={styles.icon}>⭕</span>
                <span>瓜脐小 = 好瓜</span>
              </div>
              <div class={styles.tip}>
                <span class={styles.icon}>🌀</span>
                <span>蒂头卷曲 = 好瓜</span>
              </div>
            </div>
            <div
              class={styles['guide-img-wrap']}
              onClick={() => { viewing.value = true; }}
            >
              <img src={guideImg} alt="挑瓜指南" class={styles['guide-img']} />
              <span class={styles['zoom-hint']}>点击放大</span>
            </div>
          </div>
        )}

        {viewing.value && (
          <div class={styles.viewer} onClick={() => { viewing.value = false; }}>
            <img src={guideImg} alt="挑瓜指南" />
            <span class={styles['close-hint']}>点击关闭</span>
          </div>
        )}
      </div>
    );
  }
});
