export default `
import { promises as fs } from 'fs';
import { basename, extname } from 'path';

type Dirent = {
  isFile(): boolean;
  isDirectory(): boolean;
  isBlockDevice(): boolean;
  isCharacterDevice(): boolean;
  isSymbolicLink(): boolean;
  isFIFO(): boolean;
  isSocket(): boolean;
  name: string;
};

export type FileFormat = {
  /** Whether this is a file or directory type. */
  type: 'directory' | 'file';

  /** The file extension if it exists. */
  extension: string | null;

  /** Any associated files in a directory type. */
  children: any[];

  /** Name of the file. */
  name: string;

  /** Absolute path to the file. */
  path: string;

  /** Files returned from fs.readdir(path, { withFileTypes: true }). */
  files: Dirent[];

  /** The current level we're operating on with -1 being the root. */
  level: number;
};
`.trimStart()
