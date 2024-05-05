import { TextInput, TextInputProps } from 'react-native';

type InputProps = TextInputProps & {};

export function Input({ ...rest }: InputProps) {
  return (
    <TextInput
      {...rest}
      className="w-full h-12 px-4 text-sm text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
    />
  );
}
