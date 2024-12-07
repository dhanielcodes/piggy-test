export interface RestaurantSchema {
    'name': string;
    'num_reviews': string;
    'timezone': string;
    'location_string': string;
    id: number;
    reviewsList:{
        id:number;
        review:string;
        rating:number;
    }[];
    favorite: boolean;
    'photo': {
        'images': {
            'small': {
                'width': string;
                'url': string;
                'height': string;
            },
            'thumbnail': {
                'width':string;
                'url': string;
                'height': string;
            },
            'original': {
                'width': string;
                'url': string;
                'height': string;
            },
            'large': {
                'width': string;
                'url': string;
                'height': string;
            },
            'medium': {
                'width': string;
                'url': string;
                'height':string;
            }
        },
        'is_blessed': boolean;
        'uploaded_date': string;
        'caption': string;
        'id':string;
        'helpful_votes': string;
        'published_date': string;
    },
    'api_detail_url':string;
    'ranking': string;
    'rating': string;
    'is_closed':boolean;
    'open_now_text': string;
    'price_level': string;
    'price': string;
    'description': string;
    'web_url': string;
    'write_review': string;
    'phone':string;
    'website': string;
    'email': string;
    'address_obj': {
        'street1': string;
        'street2': string;
        'city': string;
        'state': null;
        'country': string;
        'postalcode':string;
    },
    'address': string;
}
