import type { SearchableSelectOption } from "../components/ui/field";

type GroupItem = { id?: string; code?: string; name: string };
type GroupData = {
  id?: string;
  code?: string;
  name: string;
  items?: GroupItem[];
};

/** Sama seperti opsi pendidikan pada pendaftaran pencaker (master education-groups). */
export function transformEducationGroupsToSelectOptions(
  groups: GroupData[],
  valueKey: "id" | "name" = "name",
  appendGroup = false,
): SearchableSelectOption[] {
  const sortedGroups = [...groups].sort((a, b) =>
    String(a.code || a.name).localeCompare(
      String(b.code || b.name),
      undefined,
      {
        numeric: true,
        sensitivity: "base",
      },
    ),
  );
  const opts: SearchableSelectOption[] = [];
  sortedGroups.forEach((g) => {
    opts.push({
      value: `group-${g.id || g.name}`,
      label: g.name,
      isGroup: true,
    });
    if (Array.isArray(g.items)) {
      const sortedItems = [...g.items].sort((ia, ib) =>
        String(ia.code || ia.name).localeCompare(
          String(ib.code || ib.name),
          undefined,
          {
            numeric: true,
            sensitivity: "base",
          },
        ),
      );
      sortedItems.forEach((item: GroupItem) => {
        opts.push({
          value: String(item[valueKey] || ""),
          label: appendGroup ? `${item.name} - ${g.name}` : item.name,
          indent: true,
        });
      });
    }
  });
  return opts;
}
