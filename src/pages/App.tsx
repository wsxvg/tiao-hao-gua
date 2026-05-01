/**
 * @file 频谱页
 * @author Yangholmes 2024-08-11
 */

import { computed, defineComponent, ref } from 'vue';
import cn from 'classnames';
import { useAudioSample } from '../useAudioSample';

import styles from './app.module.less';
import Watermelon, { Type } from '@/components/Watermelon';
import PermissionApply from '@/components/PermissionApply';
import PickGuide from '@/components/PickGuide';

const MIN_FREQ = 133;
const MAX_FREQ = 160;

const verdictMap: Record<Type, { text: string; emoji: string; color: string }> = {
  [Type.Null]: { text: '等待检测...', emoji: '🍉', color: '#999' },
  [Type.Raw]: { text: '生瓜蛋子', emoji: '❌', color: '#e74c3c' },
  [Type.Good]: { text: '好瓜！', emoji: '✅', color: '#27ae60' },
  [Type.Overripe]: { text: '过熟了', emoji: '⚠️', color: '#f39c12' }
};

export default defineComponent({
  name: 'App',
  setup() {
    const { getAudioCtx } = useAudioSample();
    const audioCtxRef = ref<AudioContext>();
    const analyserRef = ref<AnalyserNode>();

    const canvasRef = ref<HTMLCanvasElement>();
    const drawHisHandle = ref<number>();
    const maxVolFreq = ref<number>();
    const isRecording = ref(false);

    const result = computed<Type>(() => {
      if (maxVolFreq.value === undefined) return Type.Null;
      if (maxVolFreq.value < MIN_FREQ) return Type.Overripe;
      if (maxVolFreq.value >= MIN_FREQ && maxVolFreq.value <= MAX_FREQ) return Type.Good;
      if (maxVolFreq.value > MAX_FREQ) return Type.Raw;
      return Type.Null;
    });

    const verdict = computed(() => verdictMap[result.value]);

    function draw() {
      if (!audioCtxRef.value || !analyserRef.value) return;

      const audioCtx = audioCtxRef.value;
      const analyser = analyserRef.value;
      const freq = audioCtx.sampleRate / 2;
      const maxFreq = 200;
      const minFreq = 20;
      const bufferLengthAlt = analyser.frequencyBinCount;
      const q = freq / bufferLengthAlt;
      const maxFreqStep = Math.floor(maxFreq / q);
      const minFreqStep = Math.floor(minFreq / q);
      const dataArrayAlt = new Uint8Array(bufferLengthAlt);

      const ctx = canvasRef.value?.getContext('2d');
      const WIDTH = canvasRef.value?.width || 0;
      const HEIGHT = canvasRef.value?.height || 0;

      function drawHis() {
        if (!ctx) return;
        drawHisHandle.value = requestAnimationFrame(drawHis);

        analyser.getByteFrequencyData(dataArrayAlt);

        ctx.fillStyle = 'rgb(255, 255, 255)';
        ctx.fillRect(0, 0, WIDTH, HEIGHT);

        const barWidth = WIDTH / (maxFreqStep - minFreqStep);
        let x = 0;
        let maxVolFreqIndex = 0;
        let volTmp = 0;

        for (let i = minFreqStep; i < maxFreqStep; i++) {
          const barHeight = dataArrayAlt[i];
          if (volTmp < barHeight) {
            volTmp = barHeight;
            maxVolFreqIndex = i;
          }

          const cFreq = i * q;
          let color = 'rgb(255, 201, 201)';
          if (cFreq >= MIN_FREQ && cFreq <= MAX_FREQ) {
            color = 'rgb(178, 242, 187)';
          }

          ctx.fillStyle = color;
          ctx.fillRect(x, HEIGHT - barHeight / 2, barWidth, barHeight / 2);
          x += barWidth;
        }

        // 好瓜范围标记线
        const minMarkX = ((MIN_FREQ - minFreq) / (maxFreq - minFreq)) * WIDTH;
        const maxMarkX = ((MAX_FREQ - minFreq) / (maxFreq - minFreq)) * WIDTH;

        ctx.strokeStyle = 'rgba(39, 174, 96, 0.6)';
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(minMarkX, 0);
        ctx.lineTo(minMarkX, HEIGHT);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(maxMarkX, 0);
        ctx.lineTo(maxMarkX, HEIGHT);
        ctx.stroke();
        ctx.setLineDash([]);

        // 频率刻度
        ctx.fillStyle = '#999';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'center';
        const scaleFreqs = [20, 50, 100, 133, 160, 200];
        for (const f of scaleFreqs) {
          const sx = ((f - minFreq) / (maxFreq - minFreq)) * WIDTH;
          ctx.fillText(`${f}`, sx, HEIGHT - 2);
        }

        maxVolFreq.value = maxVolFreqIndex * q;
      }

      drawHis();
    }

    const hasGranted = computed<boolean>(() => !!audioCtxRef.value && !!analyserRef.value);

    function init() {
      if (!audioCtxRef.value || !analyserRef.value) {
        getAudioCtx().then((res) => {
          const { audioCtx, analyser } = res;
          audioCtxRef.value = audioCtx;
          analyserRef.value = analyser;
          audioCtx.suspend();
        });
      }
    }

    function startRecording() {
      if (!audioCtxRef.value || !analyserRef.value || isRecording.value) return;
      const audioCtx = audioCtxRef.value;
      if (audioCtx.state === 'suspended') {
        audioCtx.resume().then(() => {
          draw();
          isRecording.value = true;
        });
      }
    }

    function stopRecording() {
      if (!audioCtxRef.value || !isRecording.value) return;
      const audioCtx = audioCtxRef.value;
      if (audioCtx.state === 'running') {
        drawHisHandle.value && cancelAnimationFrame(drawHisHandle.value);
        drawHisHandle.value = undefined;
        audioCtx.suspend();
        isRecording.value = false;
      }
    }

    // 按住开始，松开停止
    function onPointerDown(e: PointerEvent) {
      e.preventDefault();
      window.navigator.vibrate?.([100]);
      startRecording();
    }

    function onPointerUp() {
      stopRecording();
    }

    function onStopContextmenu(e: MouseEvent) {
      e.preventDefault();
    }

    return () => (
      <div class={styles.app}>
        {/* 西瓜图片 + 文字判定 */}
        <div class={styles['result-area']}>
          <Watermelon type={result.value} />
          <div class={styles.verdict} style={{ color: verdict.value.color }}>
            <span class={styles.emoji}>{verdict.value.emoji}</span>
            <span class={styles['verdict-text']}>{verdict.value.text}</span>
          </div>
        </div>

        {/* 频率数值 */}
        <div class={styles['freq-display']}>
          <span
            class={styles['freq-number']}
            style={{ color: verdict.value.color }}
          >
            {maxVolFreq.value !== undefined ? Math.round(maxVolFreq.value) : '--'}
          </span>
          <span class={styles['freq-unit']}>Hz</span>
        </div>

        {/* 频谱直方图 */}
        <div class={styles.his}>
          <canvas ref={canvasRef} />
          <div class={styles['freq-label']}>
            好瓜范围: {MIN_FREQ}-{MAX_FREQ}Hz
          </div>
        </div>

        {/* 使用提示 */}
        {!isRecording.value && hasGranted.value && (
          <div class={styles.hint}>按住按钮 → 拍西瓜 → 看频率</div>
        )}
        {isRecording.value && (
          <div class={styles['hint-active']}>正在听... 松开停止</div>
        )}

        {/* 按钮 */}
        <div
          class={cn(styles['push-btn'], { [styles.touching]: isRecording.value })}
          onPointerdown={onPointerDown}
          onPointerup={onPointerUp}
          onPointerleave={onPointerUp}
          onContextmenu={onStopContextmenu}
        />

        {/* 挑瓜指南 */}
        <PickGuide />

        {/* 授权弹窗 */}
        {hasGranted.value ? <></> : <PermissionApply onGrant={init} />}
      </div>
    );
  }
});
