import { pluck, find, propEq } from 'ramda'

const allowedTypes = [
    {
        name: 'outerWidth',
        type: 'number',
        required: false,
        default: 30
    },
    {
        name: 'outerHeight',
        type: 'number',
        required: false,
        default: 30
    },
    {
        name: 'outerStyle',
        type: 'enum',
        required: false,
        default: 'circle',
        allowed: ['circle', 'square', 'diamond', 'disable']
    },
    {
        name: 'hoverEffect',
        type: 'enum',
        required: false,
        default: 'circle-move',
        allowed: ['circle-move', 'pointer-blur', 'pointer-overlay']
    },
    {
        name: 'hoverItemMove',
        type: 'boolean',
        required: false,
        default: false
    },
    {
        name: 'defaultCursor',
        type: 'boolean',
        required: false,
        default: false
    },
];

export default class Options {
    defaultOptions = {}

    constructor(options) {
        this.defaultOptions = this.generateDefault()

        // push user's options to default options one-by-one:
        for(let key in options) {            
            if(this.isValid(key, options[key])) {
                this.defaultOptions[key] = options[key]
            }  
        }

        return this.defaultOptions
    }

    /**
     * Generate default options based on allowedTypes
     * @return {Object} generated options
     */
    generateDefault() {
        const acceptedKey = pluck('name', allowedTypes)

        let output = {}
        for(let key of acceptedKey) {
            output[key] = this.getOptionByKey(key)['default']            
        }

        return output
    }

    /**
     * This function is to check if an option is valid or not
     * @param {String} key 
     * @param {Any}} value 
     * @return {Boolean}
     */
    isValid(key, value) {        
        // check if key is acceptable:
        const acceptedKey = pluck('name', allowedTypes)

        if(!acceptedKey.includes(key)) {
            // throw new Error(`${key} is not a valid option`)
            console.error(`${key} is not a valid option`)
            return false
        }        

        // check if the type of value is valid:
        const allowedOption = this.getOptionByKey(key)
        let isTypeValid = false

        switch (allowedOption.type) {
            case 'number':
                isTypeValid = Number.isInteger(value)
                break;
            case 'enum':
                isTypeValid = allowedOption.allowed.includes(value)
                break;
            case 'boolean':
                isTypeValid = (typeof value === 'boolean')
                break;
            default:
                isTypeValid = false
                break;
        }

        return isTypeValid
    }

    getOptionByKey(key) {
        return find(propEq('name', key), allowedTypes)
    }
}