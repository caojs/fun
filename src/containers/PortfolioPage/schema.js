import { object, array, number, string, lazy } from 'yup';

export default object()
    .shape({
        tickers: array().of(string()),
        allocations: array()
            .of(array()
                .of(number()
                    .transform((current, original) => {
                        return !original ? 0 : current;
                    })
                    .notRequired()
                    .min(0, "Invalid number")
                    .typeError("Must be a number."))
            )
    });