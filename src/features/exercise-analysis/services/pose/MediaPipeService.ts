import { FilesetResolver, PoseLandmarker, PoseLandmarkerResult } from '@mediapipe/tasks-vision';

class MediaPipeService {
  private poseLandmarker: PoseLandmarker | null = null;
  private isInitializing = false;
  private initializationPromise: Promise<void> | null = null;

  /**
   * Initializes the Pose Landmarker if it hasn't been initialized yet.
   */
  public async initialize(): Promise<void> {
    if (this.poseLandmarker) return;
    
    if (this.isInitializing && this.initializationPromise) {
      return this.initializationPromise;
    }

    this.isInitializing = true;
    
    this.initializationPromise = new Promise(async (resolve, reject) => {
      try {
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
        );
        
        this.poseLandmarker = await PoseLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task",
            delegate: "GPU" // Utilizar GPU se disponível
          },
          runningMode: "VIDEO",
          numPoses: 1, // Assumindo uma pessoa na câmera
          minPoseDetectionConfidence: 0.5,
          minPosePresenceConfidence: 0.5,
          minTrackingConfidence: 0.5,
          outputSegmentationMasks: false,
        });
        
        this.isInitializing = false;
        resolve();
      } catch (error) {
        this.isInitializing = false;
        console.error("Erro ao inicializar o MediaPipe Pose Landmarker:", error);
        reject(error);
      }
    });

    return this.initializationPromise;
  }

  /**
   * Detects pose landmarks from a video frame.
   * Note: The HTMLVideoElement must be playing.
   */
  public detectForVideo(video: HTMLVideoElement, timestampMs: number): PoseLandmarkerResult | null {
    if (!this.poseLandmarker) {
      console.warn("PoseLandmarker não está inicializado.");
      return null;
    }

    try {
      return this.poseLandmarker.detectForVideo(video, timestampMs);
    } catch (error) {
      console.error("Erro durante a detecção de pose:", error);
      return null;
    }
  }

  /**
   * Disposes the landmarker to free up memory.
   */
  public dispose() {
    if (this.poseLandmarker) {
      this.poseLandmarker.close();
      this.poseLandmarker = null;
    }
  }
}

export const mediaPipeService = new MediaPipeService();
