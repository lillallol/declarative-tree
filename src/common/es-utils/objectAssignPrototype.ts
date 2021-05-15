export function objectAssignPrototype<O extends object, P extends object>(_: { object: O; prototype: P }): O & P {
    const { object, prototype } = _;

    Object.setPrototypeOf(object, prototype);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    return object;
}