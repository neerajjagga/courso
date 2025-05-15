
export interface videoPlayerOptions {
    autoplay: boolean;
    controls: boolean;
    responsive: boolean;
    fluid: boolean;
    sources: [{
        src: string
        type: string
    }]
}