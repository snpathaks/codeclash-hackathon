export interface SlideElement {
    id: string;
    type: 'text' | 'image' | 'shape' | 'bulletList';
    content: string;
    x: number;
    y: number;
    width: number;
    height: number;
    style?: {
        backgroundColor?: string;
        borderRadius?: string;
        fontSize?: string;
        fontWeight?: string;
        textAlign?: 'left' | 'center' | 'right';
        color?: string;
        shapeType?: 'rectangle' | 'circle' | 'triangle';
        listItems?: string[];
        imageUrl?: string;
    };
}

export interface Slide {
    id: number;
    title: string;
    content: string;
    notes: string;
    elements: SlideElement[];
}

export interface HistoryState {
    slides: Slide[];
    currentSlide: number;
}