from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import re
from typing import List, Dict, Any
from dataclasses import dataclass
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

@dataclass
class Slide:
    title: str
    content: str

class PresentationGenerator:
    """Core presentation generation logic"""
    
    def __init__(self):
        self.presentation_templates = {
            'business': {
                'structure': ['Introduction', 'Problem Statement', 'Solution', 'Market Analysis', 'Strategy', 'Implementation', 'Results', 'Conclusion'],
                'tone': 'professional'
            },
            'educational': {
                'structure': ['Overview', 'Learning Objectives', 'Key Concepts', 'Examples', 'Practice', 'Summary', 'Next Steps'],
                'tone': 'informative'
            },
            'technical': {
                'structure': ['Overview', 'Architecture', 'Implementation', 'Features', 'Demo', 'Technical Details', 'Performance', 'Conclusion'],
                'tone': 'technical'
            },
            'creative': {
                'structure': ['Concept', 'Inspiration', 'Design Process', 'Key Elements', 'Showcase', 'Impact', 'Future Vision'],
                'tone': 'engaging'
            }
        }
    
    def detect_presentation_type(self, prompt: str) -> str:
        """Intelligently detect presentation type from prompt"""
        prompt_lower = prompt.lower()
        
        # Business keywords
        if any(word in prompt_lower for word in ['business', 'strategy', 'market', 'revenue', 'profit', 'company', 'startup', 'sales']):
            return 'business'
        
        # Educational keywords
        if any(word in prompt_lower for word in ['learn', 'teach', 'education', 'course', 'lesson', 'tutorial', 'explain']):
            return 'educational'
        
        # Technical keywords
        if any(word in prompt_lower for word in ['technical', 'software', 'system', 'code', 'architecture', 'api', 'database']):
            return 'technical'
        
        # Creative keywords
        if any(word in prompt_lower for word in ['creative', 'design', 'art', 'concept', 'vision', 'innovative']):
            return 'creative'
        
        return 'business'  # Default fallback
    
    def generate_slides(self, prompt: str) -> List[Dict[str, str]]:
        """Generate slides based on prompt"""
        try:
            presentation_type = self.detect_presentation_type(prompt)
            template = self.presentation_templates[presentation_type]
            
            # Extract key topics from prompt
            topics = self._extract_topics(prompt)
            
            # Generate slides based on template structure
            slides = []
            for i, section in enumerate(template['structure']):
                slide = self._generate_slide_content(section, topics, presentation_type, i)
                slides.append({
                    'title': slide.title,
                    'content': slide.content
                })
            
            return slides
            
        except Exception as e:
            logger.error(f"Error generating slides: {str(e)}")
            return self._get_fallback_slides(prompt)
    
    def _extract_topics(self, prompt: str) -> List[str]:
        """Extract key topics from the prompt"""
        # Simple topic extraction - can be enhanced with NLP
        words = re.findall(r'\b[A-Za-z]{3,}\b', prompt)
        # Filter out common words
        stop_words = {'the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'had', 'her', 'was', 'one', 'our', 'out', 'day', 'get', 'has', 'him', 'his', 'how', 'its', 'may', 'new', 'now', 'old', 'see', 'two', 'who', 'boy', 'did', 'she', 'use', 'her', 'way', 'many', 'than', 'them', 'well', 'were'}
        topics = [word for word in words if word.lower() not in stop_words]
        return topics[:10]  # Limit to 10 key topics
    
    def _generate_slide_content(self, section: str, topics: List[str], presentation_type: str, index: int) -> Slide:
        """Generate content for a specific slide section"""
        # This is a simplified content generation - in production, you'd use AI APIs
        topic_text = ', '.join(topics[:3]) if topics else 'your topic'
        
        content_templates = {
            'Introduction': f"Welcome to our presentation on {topic_text}.\n\n• Overview of key concepts\n• What you'll learn today\n• Why this matters",
            'Problem Statement': f"Current challenges with {topic_text}:\n\n• Identify key issues\n• Impact on stakeholders\n• Need for solutions",
            'Solution': f"Our approach to {topic_text}:\n\n• Innovative methodology\n• Key benefits\n• Implementation strategy",
            'Overview': f"Understanding {topic_text}:\n\n• Core principles\n• Key components\n• Learning objectives",
            'Concept': f"The vision behind {topic_text}:\n\n• Creative inspiration\n• Core ideas\n• Unique approach"
        }
        
        # Generate contextual content
        if section in content_templates:
            content = content_templates[section]
        else:
            content = f"Key insights about {section.lower()}:\n\n• Important points\n• Relevant details\n• Actionable takeaways"
        
        return Slide(title=section, content=content)
    
    def _get_fallback_slides(self, prompt: str) -> List[Dict[str, str]]:
        """Fallback slides in case of error"""
        return [
            {
                'title': 'Introduction',
                'content': f'Welcome to our presentation about:\n{prompt}\n\n• Overview\n• Key points\n• What to expect'
            },
            {
                'title': 'Main Content',
                'content': 'Key information and insights:\n\n• Important details\n• Supporting data\n• Examples and cases'
            },
            {
                'title': 'Conclusion',
                'content': 'Summary and next steps:\n\n• Key takeaways\n• Action items\n• Thank you for your attention'
            }
        ]

class SlideManager:
    """Manages slide operations"""
    
    def __init__(self):
        self.presentations = {}  # In-memory storage - use database in production
        self.current_id = 0
    
    def create_presentation(self, slides: List[Dict[str, str]]) -> str:
        """Create a new presentation and return ID"""
        self.current_id += 1
        presentation_id = str(self.current_id)
        self.presentations[presentation_id] = slides
        return presentation_id
    
    def get_presentation(self, presentation_id: str) -> List[Dict[str, str]]:
        """Retrieve presentation by ID"""
        return self.presentations.get(presentation_id, [])
    
    def update_slide(self, presentation_id: str, slide_index: int, slide_data: Dict[str, str]) -> bool:
        """Update a specific slide"""
        if presentation_id in self.presentations:
            slides = self.presentations[presentation_id]
            if 0 <= slide_index < len(slides):
                slides[slide_index].update(slide_data)
                return True
        return False
    
    def delete_presentation(self, presentation_id: str) -> bool:
        """Delete a presentation"""
        if presentation_id in self.presentations:
            del self.presentations[presentation_id]
            return True
        return False

# Initialize services
generator = PresentationGenerator()
slide_manager = SlideManager()

# API Routes
@app.route('/api/presentai', methods=['POST'])
def generate_presentation():
    """Generate slides from prompt"""
    try:
        data = request.get_json()
        prompt = data.get('prompt', '')
        
        if not prompt.strip():
            return jsonify({'error': 'Prompt is required'}), 400
        
        # Generate slides
        slides = generator.generate_slides(prompt)
        
        # Store presentation
        presentation_id = slide_manager.create_presentation(slides)
        
        return jsonify({
            'slides': slides,
            'presentation_id': presentation_id,
            'message': 'Presentation generated successfully'
        })
    
    except Exception as e:
        logger.error(f"Error in generate_presentation: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/presentations/<presentation_id>', methods=['GET'])
def get_presentation(presentation_id):
    """Get presentation by ID"""
    try:
        slides = slide_manager.get_presentation(presentation_id)
        if not slides:
            return jsonify({'error': 'Presentation not found'}), 404
        
        return jsonify({
            'slides': slides,
            'presentation_id': presentation_id
        })
    
    except Exception as e:
        logger.error(f"Error in get_presentation: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/presentations/<presentation_id>/slides/<int:slide_index>', methods=['PUT'])
def update_slide(presentation_id, slide_index):
    """Update a specific slide"""
    try:
        data = request.get_json()
        slide_data = {
            'title': data.get('title', ''),
            'content': data.get('content', '')
        }
        
        success = slide_manager.update_slide(presentation_id, slide_index, slide_data)
        
        if not success:
            return jsonify({'error': 'Slide not found'}), 404
        
        return jsonify({
            'message': 'Slide updated successfully',
            'slide_index': slide_index
        })
    
    except Exception as e:
        logger.error(f"Error in update_slide: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/presentation-types', methods=['GET'])
def get_presentation_types():
    """Get available presentation types and their descriptions"""
    types = {
        'business': {
            'name': 'Business',
            'description': 'Professional presentations for business contexts',
            'sections': generator.presentation_templates['business']['structure']
        },
        'educational': {
            'name': 'Educational',
            'description': 'Learning-focused presentations for teaching',
            'sections': generator.presentation_templates['educational']['structure']
        },
        'technical': {
            'name': 'Technical',
            'description': 'Technical presentations for developers and engineers',
            'sections': generator.presentation_templates['technical']['structure']
        },
        'creative': {
            'name': 'Creative',
            'description': 'Creative presentations for design and innovation',
            'sections': generator.presentation_templates['creative']['structure']
        }
    }
    
    return jsonify({'types': types})

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'service': 'PresentAI Backend',
        'version': '1.0.0'
    })

@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Endpoint not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
