# Hot-or-Not Post Curation Tool - Technical Specification

**Document Type**: Technical Specification  
**Author**: Cline (AI Software Engineer)  
**Version**: 2.0 (Updated)  
**Date**: December 17, 2025  
**Status**: ✅ IMPLEMENTED AND ENHANCED

## 1. Overview

### 1.1 Purpose
The Hot-or-Not tool is an internal web-based interface for efficiently classifying blog posts into curated categories. It enables rapid post review and organization for front page placement, archival processing, or deletion.

### 1.2 Current Implementation Status
- ✅ **Fully Implemented** with significant enhancements beyond original scope
- ✅ **Production Ready** and actively in use
- ✅ **Enhanced Features** include keyboard shortcuts, queue management, and advanced UI

## 2. System Architecture

### 2.1 Technology Stack
- **Framework**: Astro.js v3
- **Language**: TypeScript/JavaScript
- **Data Storage**: JSON files in `var/data/` directory
- **API**: Astro API routes
- **Frontend**: Astro pages with vanilla JavaScript

### 2.2 Directory Structure
```
src/
├── pages/
│   ├── hot-or-not.astro          # Main tool interface
│   └── api/hot-or-not/
│       ├── next-post.json.ts     # Fetch next unclassified post
│       └── classify.ts           # Save post classification
└── utils/
    └── getPublishedPosts.ts      # Post data access utility

var/
└── data/                         # Classification data storage
    ├── front-page-posts.json     # Front page classified posts
    ├── processed-posts.json      # Processed/buried posts
    └── delete-posts.json         # Posts marked for deletion
```

## 3. Data Model

### 3.1 Post Classification Files
All classification files are JSON arrays containing post slugs (strings):

```json
{
  "front-page-posts.json": ["2592098", "1300805224", "24050673387", "700564116"],
  "processed-posts.json": ["19946517", "25096396", "4988822", "880638476", "40489990157", "7905790"],
  "delete-posts.json": ["20130075", "3250686"]
}
```

### 3.2 Post Object Structure
Posts retrieved from the API include:

```typescript
interface PostData {
  slug: string;
  data: {
    id: string;
    title: string;
    date: string;
    form: 'regular' | 'link' | 'quote' | 'photo' | 'photogallery' | 'video' | 'audio' | 'chat';
    linkurl?: string;
    photo_original_url?: string;
    photo_caption?: string;
  };
  body: string;
  stats: {
    total: number;
    remaining: number;
    frontpage: number;
    buried: number;
    deleted: number;
  };
}
```

## 4. API Specification

### 4.1 GET /api/hot-or-not/next-post.json

**Purpose**: Retrieves the next unclassified post for review

**Response**:
- **Success (200)**: Returns post object with stats
- **Empty Queue**: Returns `{ "empty": true }`

**Implementation Details**:
- Reads all published posts from Astro content collection
- Filters out posts already in any classification file
- Selects random post from remaining unclassified posts
- Includes comprehensive statistics
- Pre-renders post content for client

### 4.2 POST /api/hot-or-not/classify

**Purpose**: Saves post classification to appropriate file

**Request Body**:
```json
{
  "slug": "string",
  "classification": "front-page" | "processed" | "delete"
}
```

**Response**:
- **Success (200)**: "Classification successful"
- **Bad Request (400)**: Missing parameters or invalid classification
- **Server Error (500)**: Internal error

**Implementation Details**:
- Validates slug and classification parameters
- Reads existing classification file
- Appends slug if not already present
- Atomically writes updated file back to disk

## 5. Frontend Specification

### 5.1 Page Structure: /hot-or-not

**Layout**: Extends `LayoutBase.astro`

**Components**:
- Post display container
- Sticky control panel with classification buttons
- Statistics display
- Queue visualization
- Feedback messaging system

### 5.2 User Interface Features

#### 5.2.1 Control Panel (Sticky)
- **Front Page Button**: Green, keyboard shortcut 'F'
- **Bury Button**: Gray, keyboard shortcut 'B'  
- **Delete Button**: Red, keyboard shortcut 'D'
- **Skip Button**: Blue, keyboard shortcut 'S'

#### 5.2.2 Information Display
- **Statistics**: Shows counts of remaining, front page, buried, deleted posts
- **Post Type**: Displays current post type (regular, link, quote, etc.)
- **Queue Dots**: Visual indicator of 10-post queue status
- **Feedback Messages**: Success/error notifications with auto-dismiss

#### 5.2.3 Enhanced Features
- **Keyboard Shortcuts**: Full keyboard navigation support
- **Queue Management**: Preloads 10 posts for smooth workflow
- **Debug Logging**: Developer console and on-screen logging
- **Responsive Design**: Mobile-friendly interface

### 5.3 Client-Side Functionality

#### 5.3.1 Post Loading
- Fetches next post on page load
- Automatically loads next post after classification
- Preloads additional posts for performance
- Handles empty queue state

#### 5.3.2 Content Rendering
- **Type-Specific Rendering**: Different display for link, photo, quote posts
- **Rich Media Support**: Image display for photo posts
- **Formatted Content**: Preserves post formatting and structure
- **External Links**: Opens post links in new tabs

#### 5.3.3 State Management
- Maintains current post reference
- Tracks queue position and content
- Handles classification state
- Manages error states

## 6. Classification Categories

### 6.1 Front Page
- **Purpose**: Posts selected for blog homepage display
- **Storage**: `var/data/front-page-posts.json`
- **Button**: Green "Front page" button
- **Shortcut**: F key

### 6.2 Processed (Bury)
- **Purpose**: Posts that have been reviewed but not selected
- **Storage**: `var/data/processed-posts.json`
- **Button**: Gray "Bury" button
- **Shortcut**: B key

### 6.3 Delete
- **Purpose**: Posts marked for deletion/removal
- **Storage**: `var/data/delete-posts.json`
- **Button**: Red "Delete" button
- **Shortcut**: D key

### 6.4 Skip
- **Purpose**: Skip current post without classification
- **Storage**: None (post remains unclassified)
- **Button**: Blue "Skip" button
- **Shortcut**: S key

## 7. Performance Requirements

### 7.1 Response Times
- Post loading: < 500ms
- Classification save: < 200ms
- Queue preloading: Background process

### 7.2 User Experience
- Seamless workflow with no manual refresh required
- Keyboard shortcuts for efficient operation
- Visual feedback for all actions
- Error handling with graceful degradation

## 8. Error Handling

### 8.1 API Errors
- Network failures: Retry with exponential backoff
- File system errors: Graceful fallback to empty arrays
- Invalid data: Sanitization and validation

### 8.2 Client Errors
- Missing elements: Defensive programming checks
- API failures: User-friendly error messages
- State corruption: Reset and reload functionality

## 9. Security Considerations

### 9.1 File System Access
- Operations restricted to `var/data/` directory
- Input validation for file paths
- Atomic file writes to prevent corruption

### 9.2 Data Validation
- Slug format validation
- Classification type enforcement
- XSS prevention in content rendering

## 10. Implementation Notes

### 10.1 Completed Features
- ✅ All core functionality implemented
- ✅ Enhanced UI/UX beyond original requirements
- ✅ Keyboard navigation support
- ✅ Performance optimizations
- ✅ Error handling and validation
- ✅ Responsive design

### 10.2 Data Migration
- **Original Plan**: `src/data/` directory
- **Actual Implementation**: `var/data/` directory
- **Impact**: Zero - functionality identical, just different location

### 10.3 Enhancement Summary
The implementation significantly exceeds the original specification with:
- Additional "Delete" classification category
- Keyboard shortcuts for all actions
- Advanced queue management and preloading
- Comprehensive statistics and feedback
- Debug logging and development tools
- Enhanced post rendering with type-specific displays

## 11. Usage Statistics (Current)

As of December 17, 2025:
- **Front Page Posts**: 4 posts
- **Processed/Buried Posts**: 6 posts
- **Deleted Posts**: 2 posts
- **Total Classified**: 12 posts

## 12. Future Enhancement Opportunities

### 12.1 Potential Improvements
- **Undo Functionality**: Allow reclassification of posts
- **Bulk Operations**: Multi-post selection and classification
- **Advanced Filtering**: Filter by post type, date, or tags
- **Progress Tracking**: Visual progress indicators
- **Export Functionality**: Export classification lists

### 12.2 Integration Opportunities
- **Front Page Integration**: Use front-page-posts.json for homepage
- **Content Management**: Connect to actual post deletion workflows
- **Analytics**: Track classification patterns and usage

---

**Document Status**: ✅ FINAL - Implementation Complete  
**Last Updated**: December 17, 2025  
**Next Review**: As needed for enhancements
